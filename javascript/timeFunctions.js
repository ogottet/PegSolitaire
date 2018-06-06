function timeAdd(s1,s2)
{
 	var a1=s1.split(/:/),a2=s2.split(/:/);
 	var v=new Array(parseInt(a1[0])+parseInt(a2[0]),parseInt(a1[1])+parseInt(a2[1]),parseInt(a1[2])+parseInt(a2[2]),parseInt(a1[3])+parseInt(a2[3]));
	var totalSecondTenths = timeToSecondTenths(v[0]+':'+v[1]+':'+v[2]+':'+v[3]);
	return secondTenthsToTime(totalSecondTenths);
}

function timeToSecondTenths(time) {
 	var a1=time.split(/:/);
 	var v=new Array(parseInt(a1[0]),parseInt(a1[1]),parseInt(a1[2]),parseInt(a1[3]));
	var totalSecondTenths = v[3] + (v[2] * 10) + (v[1] * 60 * 10) + (v[0] * 60 * 60 * 10);
	return totalSecondTenths;
}

function secondTenthsToTime(totalSecondTenths) {
	var separator = ':';
	var hours = totalSecondTenths / 60 / 60 / 10 - (totalSecondTenths / 60 / 60 / 10)%1;
	if (hours < 10) { '0' + hours }
	totalSecondTenths = totalSecondTenths - (hours * 60 * 60 * 10);
	var minutes = Math.floor(totalSecondTenths / 60 / 10);
	if (minutes < 10) { '0' + minutes }
	totalSecondTenths = totalSecondTenths - (minutes * 60 * 10);
	var seconds = Math.floor(totalSecondTenths / 10);
	if (seconds < 10) { '0' + seconds }
	totalSecondTenths = totalSecondTenths - (seconds * 10);
	var secondTenths = totalSecondTenths;
	return hours+separator+minutes+separator+seconds+separator+secondTenths;
}