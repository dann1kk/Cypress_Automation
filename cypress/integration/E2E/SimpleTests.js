///  <reference types="Cypress" />
///  <reference types="Cypress-iframe" />
import 'cypress-iframe'

describe('Demo Simple Tests', () => {


    it('Search Test', () => {
      cy.visit('https://rahulshettyacademy.com/seleniumPractise/#/')
  
      cy.get('.search-keyword').type('carrot')
      cy.get('.search-button').click()
    })

    it('Search and assert nr elements', () => {

      cy.visit('https://rahulshettyacademy.com/seleniumPractise/#/')
  
      cy.get('.search-keyword').type('capsicum')
      cy.get('.search-button').click()
      cy.wait(1000)
      // all elements with this locator
      cy.get('.product').should('have.length', 2)

    })

    it('Assert how much visible elements', () => {

      cy.visit('https://rahulshettyacademy.com/seleniumPractise/#/')
      // number of all visible elements with this locator
      cy.get('.product:visible').should('have.length', 30)
      // find all elements in part products
      cy.get('.products:visible').find('.product').should('have.length', 30)
 
    })

    it('Find particular element and click', () => {
      cy.visit('https://rahulshettyacademy.com/seleniumPractise/#/')
      // get particular product with index
      cy.get('.products:visible').find('.product').eq(3)
      // click button with particular number using index
      cy.get('.products:visible').find('.product').eq(3).contains('ADD TO CART').click()
      cy.get('.product-action').eq(2).click()

    })

    it('Find element in list and click on it', () => {

      cy.visit('https://rahulshettyacademy.com/seleniumPractise/#/')
      cy.wait(1000)
      // make a recursion on all products and search for product with particular name
      cy.get('.products').find('.product').each(($el, index, $list) => {

      const textProduct=$el.find('h4.product-name').text()
      if(textProduct.includes('Cucumber'))
      {
        cy.wrap($el).find('button').click()
      }
      })
    })

    it('Get text from a logo', () => {
      cy.visit('https://rahulshettyacademy.com/seleniumPractise/#/')
      // make a function to get text printed
      cy.get('.brand').then(function(logo){

        cy.log(logo.text())

      })
      // check if logo contains required text
      cy.get('.brand').contains('GREENKART')
      cy.get('.brand').should('have.text', 'GREENKART')

    })

    it('Add items in cart and click on checkout', () => {
      cy.visit('https://rahulshettyacademy.com/seleniumPractise/#/')
      // use alias as a variable for smth
      cy.wait(1000)
      cy.get('.products').find('.product').each(($el, index, $list) => {

        const textProduct=$el.find('h4.product-name').text()
        if(textProduct.includes('Mango'))
        {
          cy.wrap($el).find('button').click()
        }
        })
      cy.get('.cart-icon > img').click()
      cy.contains('PROCEED TO CHECKOUT').click()
      cy.wait(1000)
      cy.contains('Place Order').click()

    })

    it('Add items in cart and click on checkout and choose from dropdown', () => {
      cy.visit('https://rahulshettyacademy.com/seleniumPractise/#/')
      // use alias as a variable for smth
      cy.wait(1000)
      cy.get('.products').find('.product').each(($el, index, $list) => {

        const textProduct=$el.find('h4.product-name').text()
        if(textProduct.includes('Mango'))
        {
          cy.wrap($el).find('button').click()
        }
        })
      cy.get('.cart-icon > img').click()
      cy.contains('PROCEED TO CHECKOUT').click()
      cy.wait(1000)
      cy.contains('Place Order').click()
      cy.get('select').contains('Moldova').click({ force: true })
      cy.get('input[type="checkbox"]').check()
      cy.get('button').click()
    })

  it('Checkboxes tests', () => {

    cy.visit('https://rahulshettyacademy.com/AutomationPractice/')
    // click / unclick checkboxes
    cy.get('#checkBoxOption1').check().should('be.checked').and('have.value','option1')
    cy.get('#checkBoxOption1').uncheck().should('not.be.checked').and('have.value','option1')
    // click multiple checkboxes, use common locator for all checkboxes
    cy.get('input[type="checkbox"]').check(['option1','option2','option3'])

  })

  it('Dropdown tests', () => {

    cy.visit('https://rahulshettyacademy.com/AutomationPractice/')
    // static dropdown
    cy.get('select').select('option3').should('have.value', 'option3')
    //dinamic dropdown
    cy.get('#autocomplete').type('Mo')
    cy.get('.ui-menu-item div').each(($el, index, $list) => {

      if($el.text()==="Moldova, Republic of")
      {
        cy.wrap($el).click()
      }

    })
    cy.get('#autocomplete').should('have.value', 'Moldova, Republic of')
  })

  it('Radio tests', () => {

    cy.visit('https://rahulshettyacademy.com/AutomationPractice/')
    cy.get('input[value="radio2"]').check().should('be.checked')
  })

  it('Pop-Ups tests', () => {

    cy.visit('https://rahulshettyacademy.com/AutomationPractice/')
    cy.get('#alertbtn').click()
    cy.on('window:alert',(str)=>
    {
      expect(str).to.be.equal('Hello , share this practice page and share your knowledge')
    })
    cy.get('#confirmbtn').click()
    cy.on('window:confirm',(str)=>
    {
      expect(str).to.be.equal('Hello , Are you sure you want to confirm?')
    })

  })

  it('Open a new page in the same tab', () => {

    cy.visit('https://rahulshettyacademy.com/AutomationPractice/')
    // remove attribute with new tab
    cy.get('#opentab').invoke('removeAttr', 'target').click()

  })

  it('Use of browser controls navigations', () => {

    cy.visit('https://rahulshettyacademy.com/AutomationPractice/')
    // remove attribute with new tab
    cy.get('#opentab').invoke('removeAttr', 'target').click()
    cy.go('back')
    cy.url().should('include', 'AutomationPractice')
    cy.go('forward')
    cy.url().should('include', 'rahulshettyacademy.com')
  })

  it('Find element in a table and assert its value', () => {

    cy.visit('https://rahulshettyacademy.com/AutomationPractice/')
    cy.get('tr td:nth-child(2)').each(($el, index, $list) => 
    {
      const text = $el.text()
      if(text.includes("Python"))
      {
        cy.get('tr td:nth-child(2)').eq(index).next().then(function(price)
        {
          const pricetext = price.text()
          expect(pricetext).to.equal('25')
        })
      }

    })

  })

  it('Mouse Hover test', () => {

    cy.visit('https://rahulshettyacademy.com/AutomationPractice/')
    // invoke something hidden and click on it
    cy.get('div.mouse-hover-content').invoke('show')
    cy.contains('Top').click()
    cy.url().should('include', 'top')
    // force click an invisible element
    // cy.contains('Top').click({force: true})

  })

  it('Handle iframes', () => {

    cy.visit('https://rahulshettyacademy.com/AutomationPractice/')
    cy.frameLoaded("#courses-iframe")

    cy.iframe().find("a[href*='mentorship']").eq(0).click()
    cy.wait(1000)
    cy.iframe().find("h1[class*='pricing-title']").should('have.length', 2)

  })

})