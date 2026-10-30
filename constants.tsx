
import React from 'react';
import { 
  FileText, 
  Tag, 
  DollarSign, 
  UserPlus, 
  Search, 
  TrendingUp,
  Layout
} from 'lucide-react';
import { Tool } from './types';

export const TOOLS: Tool[] = [
  {
    id: '1',
    title: 'Cadastro de Entradas NF',
    category: 'Formulário',
    url: 'https://cadastro-de-entradas-de-n-fs-atacad.vercel.app/',
    description: 'Registro e controle de notas fiscais de entrada para o estoque.',
    status: 'active'
  },
  {
    id: '2',
    title: 'Cadastro de Produtos',
    category: 'Formulário',
    url: 'https://cadastro-de-produtos-novos.vercel.app/',
    description: 'Inclusão de novos itens no catálogo do sistema corporativo.',
    status: 'active'
  },
  {
    id: '3',
    title: 'Calculadora de Preços',
    category: 'Financeiro',
    url: 'https://calculadora-de-precos-rho.vercel.app/',
    description: 'Ferramenta auxiliar para precificação técnica e margem de lucro.',
    status: 'active'
  },
  {
    id: '4',
    title: 'Controle de Descartes',
    category: 'Operacional',
    url: 'https://centralatacadaodonatural.site/controle-de-descartes-e-perdas/',
    description: 'Gestão de perdas, avarias e vencimento de produtos.',
    status: 'active'
  },
  {
    id: '5',
    title: 'Ficha de Admissão',
    category: 'Recursos Humanos',
    url: 'https://ficha-admissao-colaborador.vercel.app/',
    description: 'Processo digital de contratação e coleta de documentos.',
    status: 'active'
  },
  {
    id: '6',
    title: 'Pesquisa de Produtos',
    category: 'Catálogo',
    url: 'https://atcnat.my.canva.site/catalogo-de-produtos',
    description: 'Consulta rápida ao mix de produtos e especificações técnicas.',
    status: 'active'
  },
  {
    id: '7',
    title: 'Projeção de Compras',
    category: 'Planejamento',
    url: 'https://centralatacadaodonatural.site/projecao-de-compras/',
    description: 'Análise de demanda e sugestão de reposição de estoque.',
    status: 'active'
  },
  {
    id: '8',
    title: 'Gerador de Placas',
    category: 'Operacional',
    url: 'https://centralatacadaodonatural.site/gerador-de-placas/',
    description: 'Criação e impressão de etiquetas de gôndola e placas de oferta personalizadas.',
    status: 'active'
  },
  {
    id: '9',
    title: 'Gerador de Etiquetas de Embalagens',
    category: 'Operacional',
    url: 'https://gerador-etiquetas-embalagens.vercel.app/',
    description: 'Criação e impressão de etiquetas personalizadas para embalagens e identificação de produtos.',
    status: 'active'
  },
];

export const getToolIcon = (categoryId: string) => {
  switch (categoryId) {
    case 'Formulário': return <FileText className="w-5 h-5" />;
    case 'Financeiro': return <DollarSign className="w-5 h-5" />;
    case 'Operacional': return <Tag className="w-5 h-5" />;
    case 'Recursos Humanos': return <UserPlus className="w-5 h-5" />;
    case 'Catálogo': return <Search className="w-5 h-5" />;
    case 'Planejamento': return <TrendingUp className="w-5 h-5" />;
    default: return <Layout className="w-5 h-5" />;
  }
};

export const COLORS = {
  primary: '#185947',
  secondary: '#D9B596',
  background: '#0a1612',
  cardBg: 'rgba(255, 255, 255, 1)',
};

export const CORRECT_PASSWORD = '01020304';
