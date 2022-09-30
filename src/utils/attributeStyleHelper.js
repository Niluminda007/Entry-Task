

export const updateStylesOnComponentUpdate =(clicked_attribute_id,chosen_attrs,update_user_choice)=> {
    if (clicked_attribute_id !== "") {

        let id = clicked_attribute_id

        let attr_id = id.split('-').pop()

        let item_name = id.substring(0, id.indexOf('_'))
        
        chosen_attrs.forEach(attr => {

            if (attr.includes(attr_id) && attr.includes(item_name)) {

                    update_user_choice(attr)
                    if(attr.includes("Color")){
                        return document.getElementById(attr).classList.remove("cilcked_color_style")
                    }
                    return document.getElementById(attr).classList.remove("cilcked_normal_style")                    
                
            }

        })

    }

}

export const storeStateOnComponentUnmount =(clicked_attribute_id,store_user_choice)=> {
    if (clicked_attribute_id !== "") {
       store_user_choice(clicked_attribute_id)
    }

}

export const displayStoredAttributes = (chosen_attrs)=> {

    if (chosen_attrs !== 0) {

        chosen_attrs.forEach(attr => {
            let item = document.getElementById(attr)
            if (item !== null) {
                    if(attr.includes("Color")) {
                        return document.getElementById(attr).classList.add("cilcked_color_style")
                    }
                    return document.getElementById(attr).classList.add("cilcked_normal_style")

                
            }
        });
    }
}
