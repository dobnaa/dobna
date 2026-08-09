// lib/screens/wallet/wallet_screen.dart
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../../providers/wallet_provider.dart';
import '../../widgets/wallet/asset_item.dart';
import '../../widgets/wallet/action_buttons.dart';
import '../../widgets/wallet/total_value_card.dart';

class WalletScreen extends StatelessWidget {
  const WalletScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final walletProvider = Provider.of<WalletProvider>(context);
    final assets = walletProvider.assets;
    final totalValue = walletProvider.totalValue;

    return Scaffold(
      backgroundColor: const Color(0xFF0B0B0E),
      appBar: AppBar(
        title: const Text('DOBNA Wallet'),
        backgroundColor: Colors.transparent,
        elevation: 0,
        actions: [
          IconButton(
            icon: const Icon(Icons.qr_code_scanner),
            onPressed: () => Navigator.pushNamed(context, '/scan-qr'),
          ),
        ],
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            TotalValueCard(totalValue: totalValue),
            const SizedBox(height: 16),
            ActionButtons(
              onDeposit: () => Navigator.pushNamed(context, '/deposit'),
              onWithdraw: () => Navigator.pushNamed(context, '/withdraw'),
              onSwap: () => Navigator.pushNamed(context, '/swap'),
              onTransfer: () => Navigator.pushNamed(context, '/transfer'),
            ),
            const SizedBox(height: 16),
            Row(
              children: [
                Expanded(
                  child: FilterChip(
                    label: const Text('Crypto'),
                    selected: walletProvider.showCrypto,
                    onSelected: (value) => walletProvider.toggleCrypto(value),
                  ),
                ),
                const SizedBox(width: 8),
                Expanded(
                  child: FilterChip(
                    label: const Text('Currency'),
                    selected: walletProvider.showCurrency,
                    onSelected: (value) => walletProvider.toggleCurrency(value),
                  ),
                ),
              ],
            ),
            const SizedBox(height: 16),
            ListView.builder(
              shrinkWrap: true,
              physics: const NeverScrollableScrollPhysics(),
              itemCount: assets.length,
              itemBuilder: (context, index) {
                final asset = assets[index];
                return AssetItem(asset: asset);
              },
            ),
          ],
        ),
      ),
    );
  }
}