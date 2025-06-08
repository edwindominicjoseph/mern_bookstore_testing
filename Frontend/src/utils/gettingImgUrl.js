function getImgUrl (name) {
    return new URL(`../assets/books/${name}`, import.meta.url)
}
export default getImgUrl
// This function takes a book name as an argument and returns the URL of the image file located in the assets/books directory. The import.meta.url is used to resolve the URL relative to the current module's location.