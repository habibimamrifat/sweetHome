const UpdateOrder = async (setReload, orderId, triggaredState) => {
  // console.log("here I am", orderId, triggaredState);

  const conditionTree = {
    accepted: {
      accepted: true,
      cooking: false,
      shipping: false,
      canceled: false,
    },
    cooking: {
      accepted: true,
      cooking: true,
      shipping: false,
      canceled: false, // Fix this condition to prevent canceling once cooking has started
    },
    shipping: {
      accepted: true,
      cooking: true,
      shipping: true,
      canceled: false, // Ensure that shipping state cannot be canceled
    },
    canceled: {
      accepted: false,
      cooking: false,
      shipping: false,
      canceled: true,
    },
  };

  const updatingState = conditionTree[triggaredState];
  const httpLink = "http://localhost:5000/baker/updateOrderState";

  // Function to update the order state
  const updateOrderState = async (httpLink, updatingState, orderId) => {
    // console.log(`${httpLink}/${orderId}`)
    try {
      const request = await fetch(`${httpLink}/${orderId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json", // Ensure correct header format
        },
        body: JSON.stringify(updatingState),
      });
      const result = await request.json();
      // console.log(result);
      if (result.modifiedCount) {
        setReload(true);
      }
    } catch (error) {
      console.log("Order updating error occurred:", error);
    }
  };

  // Check the status of the order
  try {
    const findOrder = await fetch(
      `http://localhost:5000/bakerFindSingleOrder/${orderId}`
    );
    const targetOrder = await findOrder.json();
    // console.log("Targeted order", targetOrder);

    const targetOrderState = targetOrder.status;

    if (
      triggaredState === "canceled" &&
      (targetOrderState.cooking || targetOrderState.shipping)
    ) {
      alert("Once cooking or shipping has started, you cannot cancel the order.");
    } else if (
      triggaredState === "cooking" && targetOrderState.shipping) 
      {
        alert("cant return to cooking when Order is shiped")
      }
      else if(
        triggaredState === "accepted" && (targetOrderState.cooking || targetOrderState.shipping))
        {
          alert(`cant return to ${triggaredState}`)
        
      }
      else if((triggaredState !== "canceled" || triggaredState === "canceled") && targetOrderState.canceled)
        {
        alert(`cant change state to ${triggaredState} the order got canceled`)
      }
      else{
        await updateOrderState(httpLink, updatingState, orderId);
      }
  } catch (error) {
    alert("Something went wrong while finding the single order.");
  }

  // console.log("The update state", updatingState);
};

export default UpdateOrder;
