//Create you project here from scratch
const moviesList = [
    { movieName: "Flash", price: 7 },
    { movieName: "Spiderman", price: 5 },
    { movieName: "Batman", price: 4 },
];

const selectMovieEle = document.querySelector('#selectMovie');

// 	movieName Element
const movieNameEle = document.querySelector('#movieName');

// 	moviePrice Element
const moviePriceEle = document.querySelector('#moviePrice');

// parent class for seat
const seatAllEle = document.querySelectorAll('.seatCont .seat');

// to update total seat count
const numberOfSeatEle = document.querySelector('#numberOfSeat');

// parent class for selected seat display
const SeatHolderEle = document.querySelector('.selectedSeatsHolder');

// span element of SeatHolder
const SpanSeatEle = document.querySelector('.noSelected')

// totalPrice element
const totalPriceEle = document.querySelector('#totalPrice');

// continue element
const proceedBtnEle = document.querySelector('#proceedBtn');

//Add eventListerner to Cancel Button
const cancelBtnEle = document.querySelector('#cancelBtn');


// to track selected seats
const SelectedSeatArr = [];

// Use moviesList array for displaing the Name in the dropdown menu
moviesList.forEach((val) => {
    let OptionVal = document.createElement('option');
    OptionVal.textContent = `${val.movieName} $${val.price}`;
    selectMovieEle.appendChild(OptionVal);
});

selectMovieEle.addEventListener('click', () => {
    const selectOption = selectMovieEle.value;
    const splitData = selectOption.split(' $');
    let SelectedMovieName = splitData[0];
    let SelectedMoviePrice = '$ ' + splitData[1];

    //         updating values of movie name and movie price
    movieNameEle.textContent = SelectedMovieName;
    moviePriceEle.textContent = SelectedMoviePrice;
})

/*
    Seat Event Listener to select and deselect
    avaliable except booked seats.
*/

function addOccupiedSeat(seatNo) {
    SelectedSeatArr.push(seatNo);
}

function removeSelectedSeat(seatNo) {
    let toBeRemoved = SelectedSeatArr.indexOf(seatNo);
    SelectedSeatArr.splice(toBeRemoved, 1);
}

function getTotalSelectedSeatCount() {
    return SelectedSeatArr.length;
}

function UpdateTotalPrice() {
    const onlyPricePattern = /(\d+)/;
    let ticketPrice = parseInt(moviePriceEle.textContent.match(onlyPricePattern));
    let totalSeat = parseInt(numberOfSeatEle.textContent);
    return ticketPrice * totalSeat;
}

function IsSelectedSeatEmpty() {
    if (SelectedSeatArr.length != 0) {
        SpanSeatEle.setAttribute('style', 'display:none;');
    } else {
        SpanSeatEle.style.display = '';
    }
}


function addSeats(seatNo) {
    IsSelectedSeatEmpty()
    let seat = document.createElement('span');
    seat.classList = 'selectedSeat';
    seat.textContent = seatNo;
    SeatHolderEle.appendChild(seat);
    // console.log(SeatHolderEle.lastElementChild);
}

function removeSeat() {
    // console.log(SeatHolderEle.lastElementChild);
    SeatHolderEle.lastElementChild.remove();
    IsSelectedSeatEmpty();
}

function UpdateSelectedToOccupied() {
    SelectedSeatArr.forEach((val) => {
        // removing selected className
        seatAllEle.item(val - 1).classList.remove('selected');
        // addimg Occupied className
        seatAllEle.item(val - 1).classList.add('occupied');
    })
}

function ResetSelectedSeatArr() {
    let seatCount = getTotalSelectedSeatCount();
    // pop all the seats
    for (let i = 0; i < seatCount; i++) {
        removeSeat();
        SelectedSeatArr.pop();
    }
    IsSelectedSeatEmpty();
}

function UpdateTotalSeat() {
    numberOfSeatEle.textContent = getTotalSelectedSeatCount();
}



//Add eventLsiter to continue Button
proceedBtnEle.addEventListener('click', () => {
    // NO Seat Selected
    if (SelectedSeatArr.length === 0) {
        alert('Oops no seat Selected');
    }
    else {
        alert('Yayy! Your Seats have been booked');

        // update selected to occupied
        UpdateSelectedToOccupied();

        // reset the SelectedArray
        ResetSelectedSeatArr();

        // update SeatSelected Count
        UpdateTotalSeat()

        // update total price
        totalPriceEle.textContent = UpdateTotalPrice();
    }
})

// Add eventLsiter to cancel Button
cancelBtnEle.addEventListener('click', () => {

    // deselect all the selected seats
    SelectedSeatArr.forEach((val) => {
        // removing selected className
        seatAllEle.item(val - 1).classList.remove('selected');
    })

    // reset the SelectedArray
    ResetSelectedSeatArr();

    // update SeatSelected Count
    UpdateTotalSeat()

    // update total price
    totalPriceEle.textContent = UpdateTotalPrice();
})



// Add eventLister to each unoccupied seat
function SelectUnoccupiedSeats() {
    seatAllEle.forEach((val, index) => {
        val.addEventListener('click', () => {
            if (!val.classList.contains('occupied')) {
                console.log("Not reserved seat clicked");
                if (val.classList.contains('selected')) {
                    val.classList.remove('selected');
                    removeSelectedSeat(index + 1);
                    removeSeat()
                }
                else {
                    val.classList.add('selected');
                    addOccupiedSeat(index + 1);
                    addSeats(index + 1);
                }

                // update total seat count
                numberOfSeatEle.textContent = getTotalSelectedSeatCount();

                // update total price
                totalPriceEle.textContent = UpdateTotalPrice();

            }
        })
    })
}


SelectUnoccupiedSeats();
