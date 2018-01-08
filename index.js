import {h,app} from 'hyperapp';
/** @jsx h */

const GIPHY_API_KEY = "dc6zaTOxFJmzC"

const state = {
  url: "",
  query: "",
  isFetching: false
}

const actions = {
  downloadGif: query => async (state, actions) => {
    actions.toggleFetching(true)
    actions.setUrl(
      await fetch(
        `//api.giphy.com/v1/gifs/search?q=${query}&api_key=${GIPHY_API_KEY}`
      )
        .then(data => data.json())
        .then(({ data }) => (data[0] ? data[0].images.original.url : ""))
    )
    actions.toggleFetching(false)
  },
  setUrl: url => ({ url }),
  setQuery: query => ({ query }),
  toggleFetching: isFetching => ({ isFetching })
}

const view = (state, actions) => (
  <main>
    <input
      type="text"
      placeholder="Type here..."
      autofocus
      onkeyup={({ target: { value } }) => {
        if (value !== state.query) {
          actions.setQuery(value)
          if (!state.isFetching) {
            actions.downloadGif(value)
          }
        }
      }}
    />
    <div class="container">
      <img
        src={state.url}
        style={{
          display: state.isFetching || state.url === "" ? "none" : "block"
        }}
      />
    </div>
  </main>
)

app(state, actions, view, document.body)
