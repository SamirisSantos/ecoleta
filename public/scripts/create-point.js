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

for(const item of itemstoCollet){
    item.addEventListener("click",handleSelectedItem);
}

const collectedItems = document.querySelector("input[name=items]");
let selectedItems = [];

function handleSelectedItem(event){
    const itemLi = event.target;
    const itemID = itemLi.dataset.id;
    // adicionar ou retirar uma class css toggle
    itemLi.classList.toggle("selected");
    //console.log("Item id", itemID)
    //verificar se tem itens selecionados
    // se sim pegar os itens
    const alreadSelected = selectedItems.findIndex(item => {
        const itemFound = item === itemID;//TRUE OR FALSE
        return itemFound;
    }) // ou item => item === itemID

       //se estiver selecionado, tirar da selecao
    if (alreadSelected >= 0){
        //remover seleção
        const filteredItems = selectedItems.filter(item=>{
            const itemDifferent = item != itemID; // FALSE
            return itemDifferent;
        })
        selectedItems = filteredItems;
    }else{
        selectedItems.push(itemID);
    } 
    //console.log('selectedItem:', selectedItems) 
    //atualizar o campo escondido com os itens selecionados
    collectedItems.value = selectedItems;

}