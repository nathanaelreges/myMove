# myMove

<br/>[TEST IT NOW](https://nathanaelreges.github.io/myMove)


Allow the users to interact with your application by moving his fingers around.  More than that, allow the user to throw things because this module renders the continuation of the movement. It calculates the velocity at the end and applies the acceleration that pulls the "object" back to where it was. Very likely the lock screen animation on Android. 

With this module, you can implement actions like drag a modal down to dismiss it or open and close a drawer menu.

<br/>

Get it up and running just like this:
```javascript
const moveModule = myMove(renderFunction, maxValue, eleToListen)

moveModule.onStartMove = () => {/*your code*/}
moveModule.onEndMove = (position) => {/*your code*/}
```
<br/>**`renderFunction`**  
```javascript
function renderFunction (moveValue) {
	element.style.transform = `translateY(${moveValue}px)` // e.g.
	//Or anything your imagination can come up with.
}
```
Render function is the function responsible for rendering the movement. It will receive an argument that represents the distance that the user's finger has traveled through the screen.

<br/>**`maxValue`**  
This one sets the number of pixels that the user will be allowed to move. MyMove will only process values between 0 and the maxValue. If you want the user to move upward, maxValue needs to be negative, since moving towards the top decreases the traveled distance. 

<br/>**`eleToListen`**  
The element wich myMove will add event listeners to watch for movements. 

<br/>**`moveModule.onStartMove`**  
You may assign this property a function to be executed when a move sequence starts, wich can be triggerd by a `touchstart` or a `mousedown` event. 

<br/>**`moveModule.onEndMove`**  
You may assign this property a function to be executed when a move sequence ends, what happens when the user isn't touching the screen and moveValue is either 0 or maxValue. The argument received by this function can be 'max' or 'zero' depending on where the moveValue is situated.   

<br/><br/><br/>**Some specific properties and methods:**
```javascript
const moveModule = myMove(arg1, arg2, arg3, {adjustAcel})

moveModule.switch()
moveModule.jump()
```


<br/>**`adjsutAcel`**  
This property lets you adjust how fast the user needs to trow to reach the opposite boundary. Acel stands for acceleration which, in this case, is what makes the "object" come back to its original coordinate. The acceleration value will be multiplied by the adjustAcel value. Set values like `2` to increase or values like `0.5` to decrease the acceleration. 0 is not accepted.

<br/>**`moveModule.jump()`**  
When you call this method, the moveValue jumps from where it is to the middle of the path between zero and maxValue, then coming back. Use this to give like a hint to the user on what he needs to do.  This action works only if the moveValue at the moment is equal to the maxValue or to `0`.

<br/>**`moveModule.switch()`**  
This method switches the moveValue from his actual position to the farthest one.

<br/>**`moveModule.moveAlreadyStarted({ startEvent })`**  
Let's say you want to append some moving elements and load myMoveModule after the user started to move. You may do it just like you would in any other case with the addition of calling this method and supplying the captured event.  
  
<br/>**`moveModule.cancelMove()`**  
This methods ends the on going move sequence if any.
  
<br/><br/>**Important:**  
Only vertical movements are evaluated.  
Works with both mouse and touch.

