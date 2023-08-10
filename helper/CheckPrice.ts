export const checkPrice =  (price: string): boolean => {
    let verifiedPrice: boolean;
    const regPrice = /^\d+?$/;
    if (regPrice.test(price)) {
        verifiedPrice = true;
    } else {
        verifiedPrice = false;
    }
    return verifiedPrice;
}