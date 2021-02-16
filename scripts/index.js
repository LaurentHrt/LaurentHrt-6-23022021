const url = './public/data/FishEyeDataFR.json'
const main = document.getElementById('main')
const tagList = document.querySelector('.tag-list')

async function getData() {
  const response = await fetch(url)
  let fishEyeData

  if (response.ok) {
    fishEyeData = await response.json()
  } else {
    alert('HTTP-Error: ' + response.status)
  }

  main.innerHTML = buildCardPhotograph(fishEyeData.photographers)

  tagList.innerHTML = buildTagList(fishEyeData.photographers)
}

function buildCardPhotograph(photographers) {
  let cardPhotographBloc = ''

  photographers.forEach((photographer) => {
    const link =
      './pages/' + photographer.name.toLowerCase().replace(' ', '') + '.html'

    cardPhotographBloc += `
        <section class="card-photograph">
        <a class="display-contents" href="${link}" role="link">
          <div class="card-photograph__portrait">
            <img src="./public/img/1_small/PhotographersID/${photographer.portrait}" alt="" />
          </div>
          <div class="card-photograph__name">${photographer.name}</div>
        </a>
          <div class="card-photograph__city">${photographer.city}, ${photographer.country}</div>
          <div class="card-photograph__tagline">${photographer.tagline}</div>
          <div class="card-photograph__price">${photographer.price}€/jour</div>
          <div class="tag-list card-photograph__tags">`

    photographer.tags.forEach((tag) => {
      cardPhotographBloc += `<a class="display-contents" href=""><span class="tag">#${tag}</span></a>`
    })

    cardPhotographBloc += '</div></section>'
  })

  return cardPhotographBloc
}

function buildTagList(photographers) {
  let tagListBloc = ''

  const tags = []
  photographers.forEach((photographer) => {
    photographer.tags.forEach((tag) => {
      tags.push(tag[0].toUpperCase() + tag.substring(1))
    })
  })

  new Set(tags).forEach((tag) => {
    tagListBloc += `<a class="display-contents" href=""><span class="tag">#${tag}</span></a>`
  })

  return tagListBloc
}
