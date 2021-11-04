export function SearchCard(props) {

let { date, id, slug,  title, _embedded} = props,
  DateFormat = new Date(_embedded.self[0].date).toLocaleDateString(),
  urlPoster = _embedded.self[0].jetpack_featured_media_url ? _embedded.self[0].jetpack_featured_media_url :  "./app/assets/no-image.jpg";

  document.addEventListener("click", e =>{
          if (!e.target.matches(".post-card a")) return false;
          localStorage.setItem("wpPostId", e.target.dataset.id);
          
        });

  return `
    <article class="post-card">
      <img src="${urlPoster}" alt="${urlPoster}">
      <h2>${title}</h2>
      <p>
        <time datetime="">${ DateFormat }</time>
        <a href="#/${_embedded.self[0].slug}" data-id="${id}">Ver publicación</a>
      </p>
    </article>
  `;
}