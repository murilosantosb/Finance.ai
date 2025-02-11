export const formatDate = (dateString: string | Date | null) => {
    if(!dateString) return "";

    const date = new Date(dateString);
    if(isNaN(date.getTime())) return "Date inválida";

    return new Intl.DateTimeFormat("en-US", {
        day: "2-digit",
        month: "short",
        year: "numeric"
    }).format(date);
};