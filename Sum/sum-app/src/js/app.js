App = {
	
    web3Provider: null,  
    contracts: {},  
    url: 'HTTP://127.0.0.1:7545',  
  
    
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
      
      return App.initContract();
    },
     
    
    initContract: function() {
        
      $.getJSON("Sum.json", function(data) {	 
      
          // Get the necessary contract artifact file and instantiate it with truffle-contract
          var sumArtifact = data;
          App.contracts.sum = TruffleContract(sumArtifact);
          
          // Set the provider for our contract
          App.contracts.sum.setProvider(App.web3Provider);

          return App.bindEvents();
        });
    },
    
    
    bindEvents: function() {  
      $(document).on('click', '#sum-value', App.sumValue);

    },


    sumValue: function(){
        App.contracts.sum.deployed().then(function(instance){
            sumInstance = instance;
            var newValue1 = $("#newInput1").val();
            var newValue2 = $("#newInput2").val();
            return sumInstance.sum(newValue1, newValue2);
        }).then(function(res){
            var resultTemplate = '<h2 class="text-center" id="resultText">' + res + '</h2>';
            jQuery("#resultRow").append(resultTemplate);
        }).catch(function(err){
            alert(err.message)
        })
    }
    
    
  };
  
  
  $(function() {
    $(window).load(function() {
      App.init();
    });
  });