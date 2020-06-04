const urlUF = `https://servicodados.ibge.gov.br/api/v1/localidades/estados`;

function populateUFs(){
    const ufSelect = document.querySelector("select[name=uf]");
    fetch(urlUF)
    .then(res => res.json())
    .then(states=>{
        for(const state of states){
            ufSelect.innerHTML += `<option value="${state.id}"> ${state.nome} </option>`;
        }
    })
}

populateUFs()

function getCities(event){
    const citySelect = document.querySelector("select[name=city]");
    const stateInput = document.querySelector("input[name=state]");
    const ufValue = event.target.value;
    const indexOfSelectedState = event.target.selectedIndex;
    stateInput.value = event.target.options[indexOfSelectedState].text;
    
    const urlCity = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`;
    
    // carregar os dados em uma array, FAZER, 
    //para não precisar requisitando a API toda vez
    
    citySelect.innerHTML = ` <option value="">Selecione a Cidade</option>`
    citySelect.disabled = true

    fetch(urlCity)
    .then (res => res.json())
    .then (cities =>{
        for (city of cities){
            citySelect.innerHTML += `<option value="${city.nome}"> ${city.nome} </option>`;
        }
        citySelect.disabled = false
    });
}

document.querySelector("select[name=uf]").addEventListener('change',getCities);

//itens de coleta

const itemstoCollet = document.querySelectorAll(".items-grid li")