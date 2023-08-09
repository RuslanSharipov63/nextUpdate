const regValue = /^[0-9A-ZА-ЯЁ]+$/i;

export const checkTags = (tags: string): boolean => {
    let checkPoint;

    let tagsArr = tags.split(" ");
   
    let newTagsArr = tagsArr.filter((el) => (el.search(regValue) === -1 || el.length === 1));
    if (newTagsArr.length === 0) {
        checkPoint = true;
    } else {
        checkPoint = false;
    }
    return checkPoint;
}