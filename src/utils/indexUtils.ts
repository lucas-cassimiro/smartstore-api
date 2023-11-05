export default function identifyEmail(find: string){
    let toggleEmail;

        let includeAva = find.includes('@')
        if(includeAva){
            toggleEmail = true
        }

        return toggleEmail ? true : false

}