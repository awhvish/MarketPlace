'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { closeBid } from '@/actions/closeBid'
import { useSession } from 'next-auth/react'
import { Ban } from 'lucide-react'

interface CloseBidButtonProps {
    postId: number;
    authorId: string;
    isClosed: boolean;
}

export const CloseBidButton = ({ postId, authorId, isClosed }: CloseBidButtonProps) => {
    const { data: session } = useSession();
    const [error, setError] = useState<string>("");
    const [success, setSuccess] = useState<string>("");
    const [isClosing, setIsClosing] = useState(false);

    const handleCloseBid = async () => {
        if (!session?.user) return;
        if (session.user.id !== authorId) return;
        if (isClosed) return;

        setIsClosing(true);
        setError("");
        setSuccess("");

        try {
            const response = await closeBid(postId);
            if (response?.error) {
                setError(response.error);
            } else {
                setSuccess(response.success || "Bid closed successfully");
                window.location.reload(); // Refresh to show updated status
            }
        } catch {
            setError("Failed to close bid");
        } finally {
            setIsClosing(false);
        }
    };

    // Only show for the artist who owns the post
    if (!session?.user || session.user.id !== authorId || isClosed) {
        return null;
    }

    return (
        <div className="mt-4">
            <Button
                onClick={handleCloseBid}
                disabled={isClosing}
                className="w-full bg-red-600 hover:bg-red-700 text-white"
            >
                <Ban className="mr-2 h-4 w-4" />
                {isClosing ? 'Closing Bid...' : 'Close Bid'}
            </Button>
            {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
            {success && <p className="mt-2 text-sm text-green-600">{success}</p>}
        </div>
    );
};