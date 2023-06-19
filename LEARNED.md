## When updating a state array with an onClick do not change the state directly
    - creating a new variable constant and then making then setting the state equal to that
# Instead map through the state and update it using the specific object
# If one of state objects is a boolean use {...list, listObject: !list.listObject}


## If you want to conditionally render a component use the && keyword instead of ? :

#  { openSaves && <SaveTile savedColors={colorsaves} savedPalettes={paletteSaves} /> }
# This will conditionally render a component when the 'openSaves' state is true
