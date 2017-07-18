/**
 * Created by prasanna_d on 7/18/2017.
 */
app.controller('ProfileController',['$scope',function ($scope) {
    var editBtn = document.getElementById('editBtn');
    var editables = document.querySelectorAll('#description');

    editBtn.addEventListener('click', function(e) {
        console.log(editables[0]);
        if (!editables[0].isContentEditable) {
            console.log('asdasd');
            editables[0].contentEditable = 'true';
            editBtn.value="Save";
        } else {
            // Disable Editing
            editables[0].contentEditable = 'false';
            // Change Button Text and Color
            editBtn.value="Edit";
            // Save the data in localStorage
            for (var i = 0; i < editables.length; i++) {
                localStorage.setItem(editables[i].getAttribute('id'), editables[i].innerHTML);
            }
        }
    });
}]);