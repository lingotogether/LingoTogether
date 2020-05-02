/*
	Parse String format time to standard timestamp
	@params strTime - time in String format
	@return timestamp
*/
export const parseTime = strTime => {
	switch(strTime) {
        case "0000": 
        	return '12:00 am'
        case "0100": 
        	return '1:00 am'
        case "0200": 
        	return '2:00 am'
        case "0300": 
        	return '3:00 am'
        case "0400": 
        	return '4:00 am'
        case "0500": 
        	return '5:00 am'
        case "0600": 
        	return '6:00 am'
        case "0700": 
        	return '7:00 am'
        case "0800": 
        	return '8:00 am'
        case "0900": 
        	return '9:00 am'
        case "1000": 
        	return '10:00 am'
        case "1100": 
        	return '11:00 am'
        case "1200": 
        	return '12:00 pm'
        case "1300": 
        	return '1:00 pm'
        case "1400": 
        	return '2:00 pm'
        case "1500": 
        	return '3:00 pm'
        case "1600": 
        	return '4:00 pm'
        case "1700": 
        	return '5:00 pm'
        case "1800": 
        	return '6:00 pm'
        case "1900": 
        	return '7:00 pm'
        case "2000": 
        	return '8:00 pm'
        case "2100": 
        	return '9:00 pm'
        case "2200": 
        	return '10:00 pm'
        case "2300": 
        	return '11:00 pm'
        default:
        	return strTime
	}
}