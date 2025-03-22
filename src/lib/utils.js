
export const primaryCategories = ["Essential Expenses","Financial & Savings","Lifestyle & Leisure","Family & Personal","Business & Work","Miscellaneous"];

export const secondaryCategories = ["Housing","Food & Groceries","Transportation","Healthcare","Insurance","Savings & Investments","Debt Payments","Entertainment","Shopping","Hobbies","Education","Gifts & Donations","Childcare","Pet Expenses","Office Expenses","Freelance/Side Business","Travel","Taxes","Miscellaneous"]


export  const formatDate = (date) => {    
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };