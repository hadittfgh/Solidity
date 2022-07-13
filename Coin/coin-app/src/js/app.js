App = {
	
    web3Provider: null,  
    contracts: {},  
    url: 'HTTP://127.0.0.1:7545', 
    minter: null,
    currentAccount: null, 
  
    
    init: function() {
      // Add Initializations	
      return App.initWeb3();
    },
  
  
    initWeb3: function() {
        
      // Is there an injected web3 instance?
      if (typeof web3 !== 'undefined') {
        // App.web3Provider = web3.currentProvider;	  
      } 
      else {
        // If no injected web3 instance is detected, fallback to the TestRPC
      }
      
      App.web3Provider = new Web3.providers.HttpProvider(App.url);  
      
      web3 = new Web3(App.web3Provider);
      web3.eth.defaultAccount = web3.eth.accounts[0];
      ethereum.enable();

      App.populatedAddress();
      
      return App.initContract();
    },
     
    
    initContract: function() {
        
      $.getJSON("Coin.json", function(data) {	 
      
          // Get the necessary contract artifact file and instantiate it with truffle-contract
          var coinArtifact = data;
          App.contracts.coin = TruffleContract(coinArtifact);
          
          // Set the provider for our contract
          App.contracts.coin.setProvider(App.web3Provider);
          App.getMinter();

          App.currentAccount = web3.eth.coinbase;
          jQuery("#current_account").text("Current user account : " + App.currentAccount);
          jQuery("#curr_account").text("Current user account : " + App.currentAccount);
          return App.bindEvents();
          
        });
    },

    populatedAddress: function(){
      new Web3(new Web3.providers.HttpProvider(App.url)).eth.getAccounts((err, accounts) => {jQuery.each(accounts, function(i){
        var optionElement = '<option value=" '+accounts[i]+' ">'+ accounts[i] + '</option>';
        jQuery("#enter_create_address").append(optionElement);
        if(web3.eth.coinbase != accounts[i]){
          jQuery("#enter_send_address").append(optionElement);
        }
      })})
    },
    
    getMinter: function() {
      App.contracts.coin.deployed().then(function(instance){
        return instance.minter();
      }).then(function(result){
        App.minter = result;
        jQuery("#minter").text("Minter : " + App.minter);
      })
    },
    
    
    bindEvents: function() {  
      $(document).on('click', '#show_balance', App.show_balance);
      $(document).on('click', '#mint_mony', App.mint_mony);
      $(document).on('click', '#send_mony', App.send_mony);

    } 
    
  };
  
  
  $(function() {
    $(window).load(function() {
      App.init();
    });
  });