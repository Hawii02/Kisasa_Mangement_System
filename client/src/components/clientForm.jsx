import React from 'react'

function clientForm() {
  return (
    <div>
    <form>
    <label for="firstName">First Name:</label>
    <input type="text" id="firstName" name="firstName" required/>
    <label for="lastName">Last Name:</label>
    <input type="text" id="lastName" name="lastName" required/>
    <label for="email">Email:</label>
    <input type="email" id="email" name="email" required/>
    <input type="submit" value="Submit"/>
    </form>
    </div>
  )
}

export default clientForm