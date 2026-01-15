import { QueryClient, useMutation } from "@tanstack/react-query";
import { useProducts } from ".."


const queryClient = new QueryClient();

export const useDeleteProduct = ({ onSuccess }: { onSuccess: () => void }) => {
    const { deleteOne } = useProducts();
    const { mutate, isPending, isSuccess, error } = useMutation({
        mutationFn: (id: number) => deleteOne(id as number),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['products'] });
            onSuccess();
        }
    });

    return {
        deleteProduct: mutate,
        isPending,
        isSuccess,
        error
    };
}