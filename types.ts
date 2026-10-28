
export type ToolCategory = 
  | 'Formulário' 
  | 'Financeiro' 
  | 'Operacional' 
  | 'Recursos Humanos' 
  | 'Catálogo' 
  | 'Planejamento'
  | (string & {});

export interface Tool {
  id: string;
  title: string;
  category: ToolCategory;
  url: string;
  description: string;
  status?: 'active' | 'maintenance' | 'beta';
}

export interface PortalStats {
  label: string;
  value: string;
  icon?: string;
}
