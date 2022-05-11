class Game {
    constructor(start){
        this.stats = new Score();
        this.wallet = new Wallet(start);

        document.getElementById('start').addEventListener('click', this.startGame.bind(this));
        this.spanWallet = document.querySelector('.panel span.wallet');
        this.boards = [...document.querySelectorAll('div.color')];
        this.inputBid = document.getElementById('bid');
        this.spanResult = document.querySelector('.score span.result');
        this.spanGames = document.querySelector('.score span.number');
        this.spanLosses = document.querySelector('.score span.loss');
        this.spanWins = document.querySelector('.score span.win');

        this.render()
    }
    render(colors = ['green', 'green', 'green'], money = this.wallet.getWalletValue(), result ="", stats = [0, 0, 0], bid = 0, wonMoney = 0 ){
        this.boards.forEach((board, i) => {
            board.style.backgroundColor = colors[i];
    })
        this.spanWallet.textContent = money;

    if(result){
        result = `Wygrałeś ${wonMoney}$.`;
    }else if (!result && result !== ""){
        result = `Przegrałeś ${bid}$.`;
    }
        this.spanResult.textContent = result;
        this.spanGames.textContent = stats[0];
        this.spanWins.textContent = stats[1];
        this.spanLosses.textContent = stats[2];

        this.inputBid.value = "";
    }
    startGame(){
        if( this.inputBid.value < 1) return alert('Kwota za którą chcesz zagrać jest za mała!');

        const bid = Math.floor(this.inputBid.value);

        if(!this.wallet.checkCanPlay(bid)){
            return alert ("Masz za mało hajsu lub podałeś nieprawidłową wartość")
            }
        this.wallet.changeWallet(bid, '-');

        this.draw = new Draw();
        const colors = this.draw.getDrawResult();
        const win = Result.checkWinner(colors);
        const wonMoney = Result.moneyWin(win, bid);
        this.wallet.changeWallet(wonMoney);
        this.stats.addGameToScore(win, bid);
        
        this.render(colors , this.wallet.getWalletValue(), win, this.stats.showGameStats(), bid, wonMoney )
    }
}

