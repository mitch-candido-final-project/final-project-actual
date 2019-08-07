document.addEventListener("DOMContentLoaded", function() {
  modalInit();
});

// function dropDownInit() {
//   var getDropdown = document.querySelectorAll(".select");
//   var dropdowns = M.FormSelect.init(getDropdown, {});
// }

function modalInit() {
  var getModal = document.querySelectorAll(".modal");
  var instances = M.Modal.init(getModal, {});
}
