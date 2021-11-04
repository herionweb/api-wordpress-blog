export function ContactForm() {
    const d = document,
        $form = d.createElement("form"),
        $styles = d.getElementById("dynamic-styles");

    $form.classList.add("contact-form");
    $styles.innerHTML = `/* **********     ContactForm Validations     ********** */
.contact-form > hr{
  padding:0px;
}

.contact-form {
  --form-ok-color: #4caf50;
  --form-error-color: #f44336;
  margin-left: auto;
  margin-right: auto;
  width: 80%;
  max-width: 65%;
}

.contact-form > * {
  padding: 0.5rem;
  margin: 1rem auto;
  display: block;
  width: 100%;
}

.contact-form textarea {
  resize: none;
}

.contact-form legend,
.contact-form-response {
  font-size: 1.5rem;
  font-weight: bold;
  text-align: center;
}

.contact-form input,
.contact-form textarea {
  font-size: 1rem;
  font-family: "Alegreya", serif;
}

.contact-form input[type="submit"] {
  width: 30%;
  font-weight: bold;
  cursor: pointer;
      border: thin;
    background-color: #222324;
    color: #ffcf2a;
    transition: 500ms ease;
}

.contact-form input[type="submit"]:hover {
  background-color: #ffcf2a;
  color: #222324;
  border: 2px solid #222324;
    -webkit-box-shadow: 0 10px 6px -6px #222324;
     -moz-box-shadow: 0 10px 6px -6px #222324;
          box-shadow: 0 10px 6px -6px #222324;
}

.contact-form *::placeholder {
  color: #222324;
}

.contact-form [required]:valid {
  border: thin solid var(--form-ok-color);
}

.contact-form [required]:invalid {
  border: thin solid var(--form-error-color);
}

.contact-form-error {
  margin-top: -1rem;
  font-size: 80%;
  background-color: var(--form-error-color);
  color: #fff;
  transition: all 800ms ease;
}

.contact-form-error.is-active {
  display: block;
  animation: show-message 1s 1 normal 0s ease-out both;
}

.contact-form-loader {
  text-align: center;
  margin: 50px auto;
  width: 80px;
}

.none {
  display: none;
}

@keyframes show-message {
  0% {
    visibility: hidden;
    opacity: 0;
  }

  100% {
    visibility: visible;
    opacity: 1;
  }
}`;

    $form.innerHTML = `<legend>¿Que necesitas de mi?</legend>
  <hr>
    <input type="text" name="name" placeholder="Escribe tu nombre"
      title="Nombre sólo acepta letras y espacios en blanco" pattern="^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\\s]+$" autocomplete = "off" required>
    <input type="email" name="email" placeholder="Escribe tu email" title="Email incorrecto"
      pattern="^[_a-z0-9]+(\\.[_a-z0-9]+)*@[a-z0-9-]+(\\.[a-z0-9-]+)*(\\.[a-z]{2,15})$" autocomplete = "off" required>
    <input type="text" name="subject" placeholder="Asunto a tratar" title="El Asunto es requerido" autocomplete = "off" required>
    <textarea name="comments" cols="50" rows="5" placeholder="Escribe tus comentarios"
      title="Tu comentario no debe exceder los 255 caracteres" data-pattern="^.{1,255}$" required></textarea>
    <input class="bubbly-button" type="submit" value="Enviar">
    <div class="contact-form-loader none">
      <img src="./app/assets/loader.svg" alt="Cargando">
    </div>
    <div class="contact-form-response none">
      <p>Los datos han sido enviados</p>
    </div>`;

    function ValidationsForm() {
        const $form = d.querySelector(".contact-form"),
            $inputs = d.querySelectorAll(".contact-form [required]");

        $inputs.forEach((input) => {
            const $span = d.createElement("span");
            $span.id = input.name;
            $span.textContent = input.title;
            $span.classList.add("contact-form-error", "none");
            input.insertAdjacentElement("afterend", $span);

        });

        d.addEventListener("keyup", (e) => {
            if (e.target.matches(".contact-form [required]")) {
                let $input = e.target,
                    pattern = $input.pattern || $input.dataset.pattern;

                if (pattern && $input.value !== "") {
                    let regex = new RegExp(pattern);
                    return !regex.exec($input.value) ?
                        d.getElementById($input.name).classList.add("is-active") :
                        d.getElementById($input.name).classList.remove("is-active");

                }

                if (!pattern) {
                    return $input.value === "" ?
                        d.getElementById($input.name).classList.add("is-active") :
                        d.getElementById($input.name).classList.remove("is-active");
                }
            }
        });

        d.addEventListener("submit", e => {
            e.preventDefault();
            const $loader = d.querySelector(".contact-form-loader"),
                $response = d.querySelector(".contact-form-response");

            $loader.classList.remove("none");

            fetch("https://formsubmit.co/ajax/alejandro_fernandez_sanchez@hotmail.es", {
                    method: "POST",
                    body: new FormData(e.target)
                })
                .then(res => res.ok ? res.json() : Promise.reject(res))
                .then(json => {
                    // console.log(json);
                    $loader.classList.add("none");
                    $response.classList.remove("none");
                    $response.innerHTML = `<p>Los datos han sido enviados</p>`;
                    $form.reset();
                })
                .catch(err => {
                    console.log(err);
                    let message = err.statusText || "Ocurrió un error al enviar , intentalo de nuevo";
                    $response.innerHTML = `<p>Error ${err.status}: ${message}</p>`;
                })
                .finally(() => setTimeout(() => {
                    $response.classList.add("none");
                    $response.innerHTML = "";
                }, 3000));
        });
    }

    setTimeout(() => ValidationsForm(), 100);

    return $form;
}