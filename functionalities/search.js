
export function search(searchBar, target){



    const matchObjectProperties = (obj, value, props = null) => {
        const valuesToCheck = props || Object.values(obj)    
        return valuesToCheck.some(objValue =>  value.test(`${objValue}`))
    }
    
    const escapeSpecialCharacters = query => query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    //Input: hello? (world) , Output: hello\? \(world\)
    
    const  buildSearchPattern = query => {
        const escapedQuery = escapeSpecialCharacters(query);
        return new RegExp(escapedQuery, 'i'); 
        //This simply is /escapedQuery/i (another way of creating a regex)
    }
    
    
    
    const displayResults = () => {
            
        const searchQuery = searchBar.value;
        const searchPattern = buildSearchPattern(searchQuery);
        const condition = {
            matchesPattern: item => matchObjectProperties(item, searchPattern)
        }
        target(condition.matchesPattern);
        
    }
    
    
    searchBar.addEventListener("keypress", event => {
        if(event.key === 'Enter')
             displayResults()
    
    })
    
    
    searchBar.addEventListener('input', event => displayResults())
}
    
    
    
    
    
    
    
    
    