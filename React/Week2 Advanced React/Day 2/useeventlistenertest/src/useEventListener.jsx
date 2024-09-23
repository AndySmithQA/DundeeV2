export default function useEventListener(pageElement) {

    const ele = pageElement.toString()
    const element = document.querySelector(ele)

    element.addEventListener('click', () => {
        alert('You clicked the image!')
    })
}