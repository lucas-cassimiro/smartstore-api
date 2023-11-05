export default function identifyEmail(find: string) {
    let toggleEmail;

    const includeAva = find.includes("@");
    if (includeAva) {
        toggleEmail = true;
    }

    return toggleEmail ? true : false;
}
