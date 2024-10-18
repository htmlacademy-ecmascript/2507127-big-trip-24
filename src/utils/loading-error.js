const errorStyles = `
  position:absolute;
  display:flex;
  justify-content:center;
  align-items:center;
  top:0;
  left:0;
  right:0;
  width:100%;
  height:40px;
  color:white;
  background-color:#E34234;
  `;

function showLoadingErrorMessage(error){
  const newElement = document.createElement('div');
  newElement.innerHTML = `<p>ERROR: ${error.message}</p>`;
  newElement.style.cssText = errorStyles;
  document.body.append(newElement);

  setTimeout(() => {
    newElement.remove();
  },2000);
}

export { showLoadingErrorMessage };
