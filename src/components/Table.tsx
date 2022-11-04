export interface TableProps {}



const Table: React.FC<TableProps> = ({}: TableProps) => {
  return <table>
      <tr>
        <th scope="col">Player</th>
        <th scope="col">Gloobles</th>
        <th scope="col">Za'taak</th>
      </tr>

      
      <tr>
          <th scope="row">TR-7</th>
          <td>7</td>
          <td>4,569</td>
      </tr>
      
      </table>;
};

export default Table;
