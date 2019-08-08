document.addEventListener("DOMContentLoaded", function() {
  modalInit();
  () => {
    var elems = document.querySelectorAll(".modal");
    var modal = M.Modal.init(elems, {});

    var selectOptions = document.querySelectorAll("select");
    var selcetDropDown = M.FormSelect.init(selectOptions, {});
  },
    false;
});

// function dropDownInit() {
//   var getDropdown = document.querySelectorAll(".select");
//   var dropdowns = M.FormSelect.init(getDropdown, {});
// }

function modalInit() {
  var getModal = document.querySelectorAll(".modal");
  var instances = M.Modal.init(getModal, {});
}
