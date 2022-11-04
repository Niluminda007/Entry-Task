import { gql } from "apollo-boost";

const ITEM_QUERY = gql`
  {
    categories {
      products {
        id
        name
        inStock
        gallery
        description
        category
        attributes {
          id
          name
          type
          items {
            displayValue
            value
            id
          }
        }
        prices {
          currency {
            label
            symbol
          }
          amount
        }
        brand
      }
    }
  }
`;
export default ITEM_QUERY;
