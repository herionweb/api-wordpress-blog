
export function Post(props) {
  let { content, date, title } = props,
  DateFormat = new Date(date).toLocaleDateString();
  return `
    <section class="post-page">
      <aside>
        <h2>${title.rendered}</h2>
        <time datetime="">${ DateFormat }</time>
      </aside>
      <hr>
      <article>${content.rendered}</article>
    </section>
  `;
}