export function decimalToDMS(decimalDegrees: number): string {
    const degrees = Math.trunc(decimalDegrees); // Get the integer part for degrees
    const minutesDecimal = Math.abs(decimalDegrees - degrees) * 60; // Get decimal part and convert to minutes
    const minutes = Math.trunc(minutesDecimal); // Get the integer part for minutes
    const seconds = (minutesDecimal - minutes) * 60; // Convert remaining decimal to seconds
    
    return `${degrees}° ${minutes}' ${seconds.toFixed(2)}"`; // Return DMS string
}

export function testValidIp(ip: string): boolean {
    const ipv4Regex = /^(\d{1,3}\.){3}\d{1,3}$/; // Regex for IPv4 address
    const classCRegEx = /^192\.168\.\d{1,3}\.\d{1,3}$/; // Regex for Class C private IP address
    const classCRegEx2 = /^10\.\d{1,3}\.\d{1,3}\.\d{1,3}$/; // Regex for Class C private IP address
    const classCRegEx3 = /^172\.(1[6-9]|2[0-9]|3[0-1])\.\d{1,3}\.\d{1,3}$/; // Regex for Class C private IP address
    const loopbackRegEx = /^127\.\d{1,3}\.\d{1,3}\.\d{1,3}$/; // Regex for loopback IP address

    const validIpV4 =  ipv4Regex.test(ip);
    const classC = classCRegEx.test(ip) || classCRegEx2.test(ip) || classCRegEx3.test(ip);
    const loopback = loopbackRegEx.test(ip);

    return validIpV4 && !classC && !loopback; // Return true if valid IPv4 and not a Class C private IP address
}