import {
  Clapperboard,
  Users,
  Layers,
  Workflow,
  Cpu,
  Compass,
  FolderOpen,
  Building2,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { FeatureIcon as FeatureIconName } from '@/data/academy';

/** Maps the icon names used in content data to concrete components. */
const icons: Record<FeatureIconName, LucideIcon> = {
  clapperboard: Clapperboard,
  users: Users,
  layers: Layers,
  workflow: Workflow,
  cpu: Cpu,
  compass: Compass,
  folder: FolderOpen,
  building: Building2,
};

export function FeatureIcon({ name, className }: { name: FeatureIconName; className?: string }) {
  const Icon = icons[name] ?? Layers;
  return <Icon aria-hidden="true" className={className} />;
}
