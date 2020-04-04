function clickthedot() {
	//Select the shape
	$('#shapes').on('change', createShape)
}

function createShape() {
	console.log($(this).val());
  $('.shape').attr('id',$(this).val());
}