export function decimalToDMS(decimalDegrees: number): string {
    const degrees = Math.trunc(decimalDegrees); // Get the integer part for degrees
    const minutesDecimal = Math.abs(decimalDegrees - degrees) * 60; // Get decimal part and convert to minutes
    const minutes = Math.trunc(minutesDecimal); // Get the integer part for minutes
    const seconds = (minutesDecimal - minutes) * 60; // Convert remaining decimal to seconds
    
    return `${degrees}° ${minutes}' ${seconds.toFixed(2)}"`; // Return DMS string
}