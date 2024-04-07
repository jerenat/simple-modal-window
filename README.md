
# Simple modal window

This is a simple modal window programmed in vanilla JavaScript and HTML

To use it, it is as simple as downloading the repository from GitHub or cloning it to the local folder, then entering the following code:




```javascript
(function () {
  const modalButton = document.querySelector("#Button id Here");

  var modal = new Modal({
    body: HERE IS THE BODY,
    title: "HERE IS THE TITTLE",
    move: HERE IS TRUE OR FALSE,
    size: {
      width: "500px",
      height: "100px",
    },
  });

  modal.show(modalButton, (data) => {
    data.innerHTML = `HTML Here is!`;
  });
})();
```

##

A simple example of the modal window appears in the `/index.html` file.
