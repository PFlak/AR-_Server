export class DatabaseHelper {
  public static async fetchDocuments(documentReferences: any[]): Promise<any[]> {
    if (!documentReferences || documentReferences.length === 0) {
      return [];
    }

    return await Promise.all(
      documentReferences.map(async (documentRef: any) => {
        const documentSnapshot = await documentRef.get();
        return documentSnapshot.data();
      })
    );
  }
}
