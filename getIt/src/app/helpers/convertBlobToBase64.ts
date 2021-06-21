/**
 * Transform an blob object to base64
 *
 * @param {object} obj - blob to convert
 * @returns {string} base64
 */
export function convertBlobToBase64 = (blob: Blob) => {
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = reject;
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.readAsDataURL(blob);
    });
}
