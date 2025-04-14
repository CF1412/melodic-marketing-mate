
import { useState } from 'react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { RefreshCw, Edit2, Check } from 'lucide-react';
import { Textarea } from '../ui/textarea';
import { LoadingSpinner } from '../LoadingSpinner';
import { type CreativeBriefOutput } from '@/types/promptConfig';

interface CreativeBriefEditorProps {
  brief: CreativeBriefOutput | null;
  isLoading: boolean;
  onRegenerate: () => void;
  onEdit: (brief: CreativeBriefOutput) => void;
}

export function CreativeBriefEditor({
  brief,
  isLoading,
  onRegenerate,
  onEdit
}: CreativeBriefEditorProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedBrief, setEditedBrief] = useState<CreativeBriefOutput | null>(brief);

  if (isLoading) {
    return (
      <Card className="p-6">
        <div className="flex items-center justify-center h-48">
          <LoadingSpinner size="lg" />
        </div>
      </Card>
    );
  }

  if (!brief) return null;

  const handleSave = () => {
    if (editedBrief) {
      onEdit(editedBrief);
      setIsEditing(false);
    }
  };

  return (
    <Card className="p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold">Creative Direction</h3>
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsEditing(!isEditing)}
          >
            {isEditing ? <Check className="h-4 w-4" /> : <Edit2 className="h-4 w-4" />}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={onRegenerate}
          >
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {isEditing ? (
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium">Visual Style</label>
            <Textarea
              value={editedBrief?.visualStyle}
              onChange={(e) => setEditedBrief({ ...editedBrief!, visualStyle: e.target.value })}
              className="mt-1"
            />
          </div>
          <div>
            <label className="text-sm font-medium">Typography</label>
            <Textarea
              value={editedBrief?.typography}
              onChange={(e) => setEditedBrief({ ...editedBrief!, typography: e.target.value })}
              className="mt-1"
            />
          </div>
          <div>
            <label className="text-sm font-medium">Colors & Textures</label>
            <Textarea
              value={editedBrief?.colorPalette}
              onChange={(e) => setEditedBrief({ ...editedBrief!, colorPalette: e.target.value })}
              className="mt-1"
            />
          </div>
          <div>
            <label className="text-sm font-medium">Key Motifs</label>
            <Textarea
              value={editedBrief?.motifs}
              onChange={(e) => setEditedBrief({ ...editedBrief!, motifs: e.target.value })}
              className="mt-1"
            />
          </div>
          <Button onClick={handleSave} className="w-full">Save Changes</Button>
        </div>
      ) : (
        <div className="prose prose-sm max-w-none">
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium text-muted-foreground">Visual Style</h4>
              <p>{brief.visualStyle}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-muted-foreground">Typography</h4>
              <p>{brief.typography}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-muted-foreground">Colors & Textures</h4>
              <p>{brief.colorPalette}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-muted-foreground">Key Motifs</h4>
              <p>{brief.motifs}</p>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
}
