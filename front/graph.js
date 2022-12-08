
async function getCurtidas() {
    let curtidas = []
    await axios.get("http://localhost:8080/sanrio/curtidas")
        .then(response => {
            const data = response.data
            curtidas = data;
        })
        .catch(error => console.log(error))
    console.log(curtidas);
    return curtidas;
}

async function grafico(){
    const ctx = document.getElementById('chart');
    const curtidas = await getCurtidas();
    
      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: curtidas.map(personagem => personagem.nome),
          datasets: [{
            label: 'Curtidas',
            data: curtidas.map(personagem => personagem.curtidas),
            backgroundColor: ['#DE0420', '#D2DC5B', '#9C73B1', '#fa9bb1', '#fedd00', '#7f4237', '#efafc4', '#fee6cb', '#f4bc70', '#1a74bb'],
            borderColor:'#000',
            borderWidth: 1
          }]
        }
      });
}
grafico()