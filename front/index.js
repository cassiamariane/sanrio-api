const url = "http://localhost:8080/sanrio"
const divCards = document.querySelector('#cards')

async function getPersonagem() {
    let personagens = []
    await axios.get(url)
        .then(response => {
            const data = response.data
            personagens = data;
        })
        .catch(error => console.log(error))
    return personagens;
}

function contar(curtidas, id){
    let contador = parseInt(curtidas);
    contador += 1
    axios.put(url +`/${id}`+`/${contador}`).then(response => {
        if(response.status == 200){
            console.log("curtiu")
        }
    })
    .catch(error => console.log(error))
    console.log(`O personagem de id ${id}, recebeu ${contador} curtidas`)
}

function toSlug(dado){

    return (dado).toLowerCase().replaceAll(" ", "_")
}

async function show() {
    const personagens = await getPersonagem();
    for(let personagem of personagens) {
        const divPersonagem = document.createElement('div')
        divPersonagem.className ='infoPersonagem'

        const meses = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"];
        const aniv = new Date(personagem.aniv)

        const anivFormatado = ((aniv.getDate() + "º de " + meses[(aniv.getMonth())]));

        const infoPersonagem = `<img src="${personagem.url_img}" class="imgPersonagem"/>
        <div class="textoPersonagem">
            <h2 class="${toSlug(personagem.nome)}">${personagem.nome}</h2>
            <p class="descricaoPersonagem">${personagem.descricao}</p>
            <p class="${toSlug(personagem.nome)}">Aniversário: ${anivFormatado}</p>
            <div id="button-container">
                <button type="submit" class="botao" id="${personagem.id}" onclick="contar(${personagem.curtidas}, ${personagem.id})">Curtir</button>
            </div>
        </div>`

        divPersonagem.innerHTML = infoPersonagem;
        divCards.appendChild(divPersonagem)
    }
}
show()

