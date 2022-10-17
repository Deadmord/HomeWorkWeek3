export class QueryHelper {
    public static updateData(table: string, parametrTitle: string, parametrValue: string, id: number): string {
        const query: string = 
            `UPDATE ${table}
            SET ${parametrTitle} = '${parametrValue}'
            WHERE id = ${id}`
        return query;
    };
}