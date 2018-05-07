$(document).ready(function(){
    $("#submit").click(function(){
		$start = $(#start).val;
		$end = $(#end).val;
		$.ajax({
		method: "POST",
		url:'http://10.36.0.144:3000/route',
		data: JSON.stringify({
			'method':'room to room',
			'origin':$start,
			'destination':$end,
			'stairs': 'true'
		}),
		success: function(data){
			for (var x = 0; x < data.length; x++){
				route.push(data)
			}
		},
		error: function(){alert("Data not found")},
		dataType: "application/json"
		});
    });
});