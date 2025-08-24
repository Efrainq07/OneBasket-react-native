export const homeScreenOptions = navData => {
    return {
        title: navData.route.params?.title ? navData.route.params.title : '',
    }
}